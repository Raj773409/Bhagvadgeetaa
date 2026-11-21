import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

// Test the production bundle using the installed Chrome, or CHROME_PATH in CI.
const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } })
const url = 'http://127.0.0.1:' + server.httpServer.address().port
const require = createRequire(import.meta.url)
let browser
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' })
  const errors = []
  for (const [width, height] of [[375,667],[430,932],[768,1024],[1024,768],[1440,900],[1920,1080]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width <= 1024 })
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url() + ' ' + response.status()) })
    await page.goto(url)
    await page.evaluate(() => document.fonts.ready)
    await page.keyboard.press('Tab')
    assert.equal(await page.locator(':focus').getAttribute('href'), '#main')
    await page.keyboard.press('Enter')
    assert.equal(await page.locator(':focus').getAttribute('id'), 'main')
    if (width <= 1024) {
      const toggle = page.getByRole('button', { name: 'Menu', exact: true })
      await toggle.tap()
      assert.equal(await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Escape')
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
      assert.equal(await toggle.evaluate(el => el === document.activeElement), true)
      await toggle.tap()
      await page.locator('#mobile-navigation').getByRole('link', { name: 'The Gita', exact: true }).tap()
      await page.waitForURL('**/gita')
      assert.equal(new URL(page.url()).pathname, '/gita')
      await page.goto(url)
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    }
    await page.locator('.action-gold').click()
    assert.equal(new URL(page.url()).hash, '#mahotsav')
    assert.equal(await page.locator('.action-outline').getAttribute('href'), '/participate')
    for (const lang of ['en','hi','te']) {
      await page.locator('select').selectOption(lang)
      await page.waitForFunction(lang => document.documentElement.lang === lang, lang)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, lang + ' overflow at ' + width)
      for (const href of await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(el => el.hash))) {
        assert.equal(await page.locator(href).count(), 1, 'Missing destination ' + href)
      }
      assert.ok(await page.locator('.hero-title').evaluate(el => {
        const r = el.getBoundingClientRect()
        return r.left >= 0 && r.right <= innerWidth
      }))
    }
    await page.reload()
    assert.equal(await page.locator('html').getAttribute('lang'), 'te')
    await page.locator('select').selectOption('en')
    await page.locator('#gita').scrollIntoViewIfNeeded()
    await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0))
    await page.evaluate(() => window.scrollTo(0,0))
    if (width === 375 || width === 1440) {
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
      const audit = await page.evaluate(async () => window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'] },
      }))
      assert.deepEqual(audit.violations.map(v => [v.id, v.nodes.map(n => n.target)]), [])
      if (process.env.QA_SCREENSHOTS) {
        await mkdir(process.env.QA_SCREENSHOTS, { recursive: true })
        await page.screenshot({ path: path.join(process.env.QA_SCREENSHOTS, 'welcome-' + width + '.png') })
      }
      const routes = ['/about', '/gita', '/gita/chapters', '/gita/chapters/2', '/gita/chapters/11', '/leadership', '/legacy', '/events', '/events/curtain-raiser', '/events/vishwa-mahotsav',
        '/global-journey', '/global-journey/india', '/global-journey/united-states', '/global-journey/new-zealand',
        '/global-journey/languages', '/global-journey/gallery', '/global-journey/timeline', '/global-journey/unity',
        '/participate', '/participate/register', '/participate/group', '/participate/confirmation', '/support-the-mission', '/donate',
        '/donations/status', '/donations/receipts', '/partner-with-us', '/volunteer', '/applications/status',
        '/participant', '/participant/profile', '/participant/pass', '/participant/preparation', '/participant/preparation/verses',
        '/admin', '/admin/participants', '/admin/participants/test-id', '/admin/registrations',
        '/admin/countries', '/admin/countries/india', '/admin/countries/india/edit', '/admin/languages',
        '/admin/content', '/admin/content/pages', '/admin/content/pages/home', '/admin/content/chapters', '/admin/content/verses',
        '/admin/media', '/admin/leadership', '/admin/events', '/admin/events/curtain-raiser', '/admin/passes',
        '/admin/checkin', '/admin/checkin/history', '/admin/finance', '/admin/finance/donations', '/admin/finance/transactions',
        '/admin/finance/receipts', '/admin/finance/refunds', '/admin/partnerships', '/admin/volunteers', '/admin/support',
        '/admin/communications', '/admin/notifications', '/admin/templates', '/admin/staff', '/admin/roles', '/admin/audit',
        '/admin/security', '/admin/analytics', '/admin/settings', '/admin/settings/branding', '/admin/settings/integrations',
        '/admin/settings/localization', '/admin/ai-center', '/admin/no-such-admin-route',
        '/gita/companion', '/experience', '/gita/explorer', '/participant/recitation-studio', '/live',
        '/participant/journey', '/participant/bookmarks', '/participant/reflections',
        '/no-such-route']
      for (const route of routes) {
        await page.goto(url + route)
        await page.waitForFunction(() => document.readyState === 'complete')
        assert.ok(((await page.locator('h1').first().textContent()) ?? '').trim().length > 0, route + ' is missing a visible <h1>')
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, route + ' overflow at ' + width)
      }
      if (width === 1440) {
        for (const route of ['/gita/chapters', '/global-journey', '/global-journey/india', '/participate', '/participate/register', '/donate', '/partner-with-us', '/volunteer',
          '/admin', '/admin/countries', '/admin/roles', '/admin/participants',
          '/gita/companion', '/gita/explorer', '/live', '/participant/journey', '/admin/ai-center']) {
          await page.goto(url + route)
          await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
          const audit = await page.evaluate(async () => window.axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'] },
          }))
          assert.deepEqual(audit.violations.map(v => [v.id, v.nodes.map(n => n.target)]), [], route + ' a11y violations')
        }
        // World locator: keyboard-focus a marker and confirm it activates without a pointer.
        await page.goto(url + '/global-journey')
        await page.locator('.world-locator-marker circle').first().focus()
        assert.equal(await page.locator('.world-locator-label').count(), 1, 'Locator marker did not show an accessible label on focus')

        // Registration: complete all three steps and confirm the result is an honest
        // "not connected" notice, never a fabricated reference number or fake success screen.
        await page.goto(url + '/participate/register')
        await page.getByLabel('Full Name', { exact: false }).fill('Test Participant')
        await page.getByLabel('Email Address', { exact: false }).fill('test@example.com')
        await page.getByLabel('Country code').fill('+1')
        await page.getByLabel('Phone Number', { exact: false }).fill('5551234567')
        await page.locator('.form-field', { hasText: 'Country of Residence' }).locator('select').selectOption({ index: 1 })
        await page.getByLabel('City', { exact: false }).fill('Testville')
        await page.getByLabel('Preferred Language', { exact: false }).selectOption('en')
        await page.getByText('I have read and agree').click()
        await page.getByRole('button', { name: 'Continue', exact: true }).click()
        await page.locator('.form-field', { hasText: 'Select Event' }).locator('select').selectOption({ index: 1 })
        await page.getByLabel('Mother tongue', { exact: false }).fill('English')
        await page.getByRole('button', { name: 'Continue', exact: true }).click()
        assert.ok(await page.getByText('Test Participant').isVisible(), 'Review screen did not show entered name')
        await page.getByText('I confirm the details above').click()
        await page.getByRole('button', { name: 'Complete Registration', exact: true }).click()
        await page.waitForURL('**/participate/confirmation')
        await page.waitForFunction(() => (document.querySelector('main')?.textContent ?? '').length > 80)
        const confirmationText = await page.locator('main').textContent() ?? ''
        assert.ok(/not yet connected|nothing has been submitted/i.test(confirmationText), 'Confirmation screen must honestly state the backend is not connected')
        assert.ok(!/BGM2027|reference\s*[:#]\s*\S+/i.test(confirmationText), 'Confirmation screen must not fabricate a registration reference')

        // Admin: dashboard must show honest zero/real counts, never fabricated figures.
        await page.goto(url + '/admin')
        const dashboardText = await page.locator('main.admin-content').textContent() ?? ''
        assert.ok(dashboardText.includes('0'), 'Dashboard should show honest zero counts for unconnected data')
        assert.ok(/\b18\b/.test(dashboardText), 'Dashboard should show the real 18-country count')
        assert.ok(!/12,?846|10,?234|56 Active Staff/.test(dashboardText), 'Dashboard must not show fabricated sample figures')

        // Admin: the preview-role switcher must actually filter sidebar navigation (real RBAC logic, not real auth).
        const sidebarLinkCount = await page.locator('.admin-sidebar a').count()
        await page.locator('.admin-role-preview select').selectOption('checkin_staff')
        await page.waitForFunction(count => document.querySelectorAll('.admin-sidebar a').length < count, sidebarLinkCount)
        assert.equal(await page.locator('.admin-sidebar a').count(), 1, 'Check-in Staff role should see only the Check-in nav item')
        await page.locator('.admin-role-preview select').selectOption('super_administrator')

        // Donation: confirm a checkout attempt never claims success without a payment provider.
        await page.goto(url + '/donate')
        await page.getByText('I agree to the donation terms').click()
        await page.getByRole('button', { name: 'Proceed to Secure Checkout', exact: true }).click()
        const donateText = await page.locator('main').textContent() ?? ''
        assert.ok(/not yet connected|no charge/i.test(donateText), 'Donate screen must honestly state payment is not connected')

        // Live: must never show a live/active broadcast when no stream is configured.
        await page.goto(url + '/live')
        const liveText = await page.locator('main').textContent() ?? ''
        assert.ok(/no live broadcast|not been authorised/i.test(liveText), 'Live page must honestly state no broadcast is authorised')
        assert.equal(await page.locator('.live-player').count(), 0, 'Live page must not render a player when no stream URL is configured')

        // Companion: a real citation must link to a verified source; nonsense queries get an honest "no source" reply, not a fabricated answer.
        await page.goto(url + '/gita/companion')
        await page.getByPlaceholder('Ask a question about the Gita…').fill('What is Karma Yoga?')
        await page.getByRole('button', { name: 'Ask', exact: true }).click()
        await page.waitForFunction(() => document.querySelectorAll('.companion-answer, .companion-answer-empty').length > 0)
        assert.ok(await page.locator('.companion-citation').first().isVisible(), 'A real answer must carry a source citation link')
        await page.getByPlaceholder('Ask a question about the Gita…').fill('zzqxw nonsense query 12345')
        await page.getByRole('button', { name: 'Ask', exact: true }).click()
        await page.waitForFunction(() => document.querySelectorAll('.companion-answer-empty').length > 0)
        assert.equal(await page.locator('.companion-answer-empty').count(), 1, 'An unmatched question must get the honest "no source found" state, not a fabricated answer')

        // Recitation Studio: microphone permission denial (never granted in this automated context) must be handled gracefully, with the text-only fallback still usable.
        await page.goto(url + '/participant/recitation-studio')
        await page.getByRole('tab', { name: 'Record', exact: true }).click()
        await page.getByRole('button', { name: /Allow Microphone/i }).click()
        await page.waitForFunction(() => document.body.textContent?.includes('Microphone access was not granted') || document.body.textContent?.includes('not granted'))
        await page.getByRole('tab', { name: 'Practise', exact: true }).click()
        assert.ok(await page.locator('.sanskrit').isVisible(), 'Text-only recitation practice must remain usable without microphone access')
      }
      await page.goto(url)
    }
    if (width === 1440) {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.reload()
      await page.locator('.scroll-link').click()
      await page.waitForFunction(() => Math.abs(document.querySelector('#gita').getBoundingClientRect().top) < 20)
      assert.equal(new URL(page.url()).hash, '#gita')
    }
    await page.close()
    console.log(width + 'px · three languages, navigation, image loading and layout verified')
  }
  assert.deepEqual(errors, [])
  console.log('Desktop and mobile automated accessibility scans passed. No console, HTTP or page errors.')
} finally {
  await browser?.close()
  await new Promise(resolve => server.httpServer.close(resolve))
}
