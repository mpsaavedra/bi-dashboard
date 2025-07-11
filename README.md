# BI Dashboard

# Multi-provider Authentication Strategy

The main goal is to let users connect their accounts from different services (like Google, Salesforce, Odoo, etc.) 
so we can pull together a complete report for them. The tricky part? We need to handle all of this magic right inside 
their web browser. Here’s how we’re planning to tackle it.

## Making the Login Process Feel Smooth

Instead of bouncing the user around to different websites, which can be disorienting, we’ll use pop-up windows for each login.

When you click "**Connect to Google**," a small, new window will pop up with the familiar Google login page. You do your thing, 
and once you’re signed in, the pop-up closes automatically. The main app will have been waiting for you right where you left it. 
Then you can do the same for the next service. It’s a much cleaner experience and feels less like you’re being passed all over 
the internet.

## Where We'll Keep the Digital "Keys"

I would decide to hold them only in the application's active memory. Think of it like writing a password on a whiteboard. As long 
as you're actively using the app, the keys are there for it to use. But the moment you close the tab or refresh the page, the 
whiteboard gets wiped completely clean. This is a deliberate security choice. The alternative, saving them in the browser's permanent 
storage, is like leaving your keys lying on a public table—more convenient, but much riskier. 

## Keeping You Logged In Seamlessly

Those digital keys expire, usually after an hour or so. It would be incredibly annoying to get logged out while you’re in the middle of something.

To prevent this, our app could have a smart assistant working in the background. Before it uses a key, it will quickly check if it's about to 
expire. If it is, the assistant will silently use a special long-term key to grab a fresh one from the provider, all without interrupting what 
the user is doing. The result is a session that feels continuous and smooth.
How does the app know when all the necessary accounts are connected and it's time to show the report? I’ll use a simple checklist behind the scenes.

A component like the "Display Report of Oddo" button will be watching this checklist. It will remain greyed out and unclickable until all the 
required boxes are checked. As soon as that last login is complete, the button will light up, letting the user know everything is ready to go.
