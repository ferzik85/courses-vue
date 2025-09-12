# Vue 3 + TypeScript + Vite courses app

# how to add eslint and prettier 
https://eslint.vuejs.org/user-guide/
npm install --save-dev --save-exact prettier

# how to add pre-commit message
npm i -D husky
Add "prepare": "husky install" to package.json scripts
npm run prepare
Add pre-commit hook:
npx husky add .husky/pre-commit "npm run format"

