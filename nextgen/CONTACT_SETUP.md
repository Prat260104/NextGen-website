# Contact Us Page Setup Guide

## Overview
The Contact Us page is now fully functional with:
- A beautiful, theme-matched contact form
- Email notifications (to team and confirmation to sender)
- Multiple contact methods
- Community call-to-action section
- Smooth animations and transitions

## Features
✅ Responsive contact form with validation
✅ Email integration with nodemailer
✅ Success/error handling
✅ Contact methods display (email, location, LinkedIn, GitHub)
✅ Theme-consistent design with green (#4DBC1B) accents
✅ Framer Motion animations for smooth interactions

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root (or copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Then update the values:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@nextgensupercomputing.org
```

### 3. Gmail Setup (if using Gmail)
If using Gmail for sending emails:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated password as `EMAIL_PASSWORD` in `.env.local`

### 4. Alternative Email Services
You can use any email service supported by nodemailer (SendGrid, AWS SES, Mailgun, etc.). Update the transporter configuration in `/app/api/contact/route.ts`.

### 5. Update Contact Information
Edit the `contactMethods` array in `/app/contact/page.tsx` to match your actual contact details:
- Email address
- Location
- LinkedIn profile
- GitHub profile

### 6. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/contact` to see the contact page.

## File Structure
```
app/
├── contact/
│   └── page.tsx          # Contact page component
├── api/
│   └── contact/
│       └── route.ts      # Email API endpoint
└── components/
    ├── Navbar.tsx        # Updated with Contact Us link
    └── Footer.tsx        # (already exists)
```

## Customization

### Styling
- Primary color: `#4DBC1B` (green accent)
- Background: Black (`#000000`)
- Text colors: White and gray shades
- All components use Tailwind CSS classes

### Email Templates
Customize email templates in `/app/api/contact/route.ts`:
- Submission email to team
- Confirmation email to sender

### Form Fields
To add/remove form fields, update:
1. `formData` state in `/app/contact/page.tsx`
2. Form inputs and labels
3. API validation in `/app/api/contact/route.ts`

## Deployment Considerations
- Ensure environment variables are set in your hosting platform
- For production, consider using a managed email service (SendGrid, etc.)
- Test email delivery before going live
- Add rate limiting to prevent spam

## Troubleshooting

### Emails not sending:
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Check if 2FA is enabled on Gmail (if using Gmail)
- Ensure the app password is generated correctly
- Check server logs for error messages

### Form not submitting:
- Check browser console for errors
- Verify API endpoint is accessible
- Ensure environment variables are loaded
- Check network tab for API responses

## Next Steps
- Add form validation on frontend
- Implement CAPTCHA to prevent spam
- Add email rate limiting
- Integrate with a CRM system
- Add webhook support for third-party integrations
