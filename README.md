# Smart Tooltip

## Prereq

### Env Vars

`OPENAI_API_KEY` must be set as env variable to use OpenAI

If `NODE_ENV=production`, then defaults to OpenAI for LLM calls.

Else will default to Ollama and defaults to model `qwen3:8b-q4_K_M`. To use the default, need to serve Ollama at `127.0.0.1:11434`

## Install

`pnpm install`

## Build Docs

`pnpm run build-storybook-prod`

Serve locally
`pnpm dlx http-server ./dist/storybook-docs`
