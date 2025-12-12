import type { ReactNode } from 'react'

type AuthCardProps = {
  title: string
  highlight?: string
  subtitle?: string
  children: ReactNode
}

export function AuthCard({ title, highlight, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-card">
      <header className="auth-card__header">
        <h1 className="auth-card__title">
          {title} {highlight && <span className="auth-card__title--accent">{highlight}</span>}
        </h1>
        {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
      </header>
      <div className="auth-card__body">{children}</div>
    </div>
  )
}

