# Garden Gate - Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)
- Firebase project configured

### Step 1: Push to Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/garden-gate.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### Step 4: Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Build your Next.js app
3. Deploy to CDN
4. Provide a production URL

### Step 5: Custom Domain (Optional)

1. Vercel Dashboard → Domains
2. Add custom domain
3. Configure DNS records as instructed

---

## ⚡ Performance Optimizations

### 1. Image Generation
- Uses `@vercel/og` with Edge Runtime
- Automatic caching via CDN
- Sub-100ms response time

### 2. Firebase Optimization
- Firestore indexes created
- Read/write operations optimized
- Connection pooling

### 3. Next.js Features
- Static page generation where possible
- API routes on Edge
- Automatic code splitting
- Image optimization

### 4. Client-Side
- React Suspense boundaries
- Lazy loading components
- localStorage for settings
- Debounced text input

---

## 🔍 Monitoring & Analytics

### Vercel Analytics
Enable in Dashboard → Analytics
- Page views
- Performance metrics
- Error tracking

### Firebase Console
Monitor:
- Firestore reads/writes
- Storage usage
- Error logs

---

## 📦 Build Optimization

### Keep Bundle Size Small
```bash
# Analyze bundle
npm run build
npx @next/bundle-analyzer
```

### Tree Shaking
- Only import what you need
- Use named imports
- Avoid default exports where possible

---

## 🐛 Error Handling

### Error Boundaries
- Implemented in `components/ErrorBoundary.tsx`
- Catches runtime errors
- Graceful degradation

### API Error Handling
- Try-catch in all async operations
- Fallback values
- User-friendly error messages

---

## 🔐 Security

### Environment Variables
- Never commit `.env.local`
- Use Vercel environment variables
- Rotate Firebase keys periodically

### Firebase Security Rules
Review and update regularly:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.resource.data.text.size() < 1000;
      allow update, delete: if false;
    }
  }
}
```

---

## 📊 Production Checklist

- [ ] Environment variables configured
- [ ] Firebase rules set properly
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error boundaries tested
- [ ] Performance tested (Lighthouse)
- [ ] SEO metadata verified
- [ ] Open Graph images working
- [ ] Mobile responsiveness checked
- [ ] Dark mode tested
- [ ] i18n tested (Chinese + English)

---

## 🎯 Post-Deployment

1. **Test on Production URL**
   - Create a post
   - Verify Firebase saves
   - Test share links
   - Check OG images

2. **Monitor Performance**
   - Vercel Analytics
   - Firebase Console
   - User feedback

3. **Iterate**
   - Fix bugs
   - Add features
   - Optimize based on metrics

---

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies installed
- Review build logs in Vercel

### Firebase Connection Issues
- Verify environment variables
- Check Firebase project status
- Review security rules

### OG Images Not Loading
- Verify `/api/og` route deployed
- Check Edge Runtime support
- Test with social media debuggers

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Firebase Docs: https://firebase.google.com/docs
