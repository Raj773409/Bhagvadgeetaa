import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; fallbackTitle: string; fallbackBody: string; retryLabel: string }
type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack)
  }
  render() {
    if (this.state.error) {
      return <div className="editorial-section section-pad" role="alert">
        <div className="container-width not-found">
          <h1>{this.props.fallbackTitle}</h1>
          <p className="section-lede">{this.props.fallbackBody}</p>
          <button type="button" className="action action-gold" onClick={() => this.setState({ error: null })}>{this.props.retryLabel}</button>
        </div>
      </div>
    }
    return this.props.children
  }
}
