# Frontend Deployment (Vite + React + EC2 + Nginx)

This repository uses **GitHub Actions** to automatically build and deploy a **Vite + React** frontend to an **EC2 instance**, served by **Nginx**.

---

## Deployment Overview

* Triggered on push to the `dev` branch
* Builds the frontend using Node.js
* Copies static build files to EC2
* Nginx serves the app as a static SPA

---

## Deployment Flow

1. Push code to `dev`
2. GitHub Actions installs dependencies
3. Vite builds the app into `dist/`
4. Build files are copied to EC2
5. Nginx reloads
6. App becomes available

---

## GitHub Actions Workflow

Workflow file location:

```text
.github/workflows/deploy.yml
```

```yaml
name: Deploy Vite React App to EC2

on:
    push:
        branches:
            - dev

jobs:
    deploy:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout repository
              uses: actions/checkout@v4

            - name: Setup Node.js
              uses: actions/setup-node@v4
              with:
                  node-version: 18

            - name: Install dependencies
              run: npm ci

            - name: Build app
              run: npm run build

            - name: Upload build to EC2
              uses: appleboy/scp-action@v0.1.7
              with:
                  host: ${{ secrets.EC2_HOST }}
                  username: ${{ secrets.EC2_USER }}
                  key: ${{ secrets.EC2_SSH_KEY }}
                  source: "dist/*"
                  target: ${{ secrets.EC2_PATH }}

            - name: Reload Nginx
              uses: appleboy/ssh-action@v1.0.3
              with:
                  host: ${{ secrets.EC2_HOST }}
                  username: ${{ secrets.EC2_USER }}
                  key: ${{ secrets.EC2_SSH_KEY }}
                  script: sudo systemctl reload nginx
```

---

## Required GitHub Secrets

Add the following secrets in:

**Repository → Settings → Secrets → Actions**

| Name          | Description          | Example                               |
| ------------- | -------------------- | ------------------------------------- |
| `EC2_HOST`    | EC2 public IP or DNS | `13.127.104.20`                       |
| `EC2_USER`    | SSH username         | `ubuntu`                              |
| `EC2_SSH_KEY` | Full private SSH key | `-----BEGIN OPENSSH PRIVATE KEY-----` |
| `EC2_PATH`    | Nginx root directory | `/var/www/html`                       |

---

## EC2 & Nginx Setup

Nginx serves files from:

```text
/var/www/html
```

Minimal Nginx config:

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The `root` directory **must match** `EC2_PATH`.

---

## Accessing the Application

After a successful deployment, open:

```text
http://13.127.104.20
```

