# 🌌 PixxelHack Webathon 1.0 Submission

Welcome to our submission for Round 1 of the **PixxelHack Webathon**.  
We’ve crafted a pixel-perfect, responsive, and visually engaging website by implementing **three unique elements** from the provided list—including a **mystery element**—while following all submission and rulebook guidelines.

---

## 🚀 Live Demo
👉 [View Deployed Website](https://your-live-link.vercel.app)

---

## 📂 Repository
👉 [GitHub Repo](https://github.com/your-repo-link)

---

## ✅ Implemented Elements

### 🖼️ Element 3 – **Image Grid with Cursor Animations**
We implemented an **interactive image + video grid** that includes:
- Custom cursor hover animation
- Grid transitions on hover
- Both images and videos as grid items

🔧 **Sample Code:**
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {mediaItems.map((item, idx) => (
    <div
      key={idx}
      className="relative overflow-hidden group cursor-pointer"
    >
      {item.type === "video" ? (
        <video src={item.src} muted autoPlay loop />
      ) : (
        <img src={item.src} alt="" />
      )}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
    </div>
  ))}
</div>


### ✅ Element 4 - Navbar (Animated Hamburger Menu)
We have recreated the animated hamburger navigation bar exactly as described in the reference video:
- Smooth icon transformation on click
- Slide-in animated navigation drawer
- Responsive design with proper layering
- Easy-to-use navigation on all screen sizes

---

### ✅ Mystery Element (Our Special Feature)
As part of the **Mystery Element**, we've included a **dynamic ripple effect background** that adds visual interaction and personality to our webpage. Key features:
- Continuous animated ripple background
- Enhances immersion and interactivity
- Fully optimized and visually appealing

---

## 💡 Additional Enhancements
- **Responsive Layout** across all devices
- Smooth **scroll-based text animation** (Element 9 at the top of the page)
- **Interactive team section** (Element 7 — partially complete)
- **Componentized** React + Vite structure for modularity
- Custom **fonts, hover animations, and layout transitions**

---

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Hosting**: Vercel / Netlify (Live link provided below)
- **Animation**: Custom CSS keyframes + Tailwind utilities
