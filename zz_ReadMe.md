
superadmin_1@example.com
Password123!

rm -rf ios/App/App/public/*
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ios
npx cap add ios

SPA:
// ----------------------------------------
# Clear Vite + Quasar cache
rm -rf node_modules/.vite
rm -rf dist

# Restart dev server
npm run dev


GIT workflow:
// ----------------------------------------
git checkout main
git branch
git merge firebase-emulators
git status
git push origin main
git branch
git branch -d firebase-emulators
git status

git checkout -b your-branch-name
git status

git log -1
git log --pretty=format:"%h | %an | %ad | %s" --date=short

// ----------------------------------------
