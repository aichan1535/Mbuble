// Smooth scroll and intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.classList.add("animate-visible")
    }
  })
}, observerOptions)

document.querySelectorAll("section").forEach((el) => {
  observer.observe(el)
})

// Animated Chart (Tokenomics)
function drawTokenomicsChart() {
  const canvas = document.getElementById("tokenChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 70

  const data = [
    { label: "Community", value: 40, color: "#D4A574" },
    { label: "Development", value: 25, color: "#8B6F47" },
    { label: "Marketing", value: 20, color: "#F4E4C1" },
    { label: "Reserve", value: 15, color: "#6B5B3C" },
  ]

  canvas.width = 280
  canvas.height = 280

  let currentAngle = -Math.PI / 2

  data.forEach((segment) => {
    const sliceAngle = (segment.value / 100) * Math.PI * 2

    ctx.fillStyle = segment.color
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.lineTo(centerX, centerY)
    ctx.fill()

    ctx.strokeStyle = "#1A1410"
    ctx.lineWidth = 2
    ctx.stroke()

    currentAngle += sliceAngle
  })

  setTimeout(() => {
    canvas.style.animation = "spin-slow 8s linear infinite"
  }, 500)
}

document.addEventListener("DOMContentLoaded", () => {
  drawTokenomicsChart()

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  /* Enhanced button click animation with ripple effect */
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.6)"
      ripple.style.pointerEvents = "none"
      ripple.style.transform = "translate(-50%, -50%)"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      const animation = ripple.animate(
        [
          { width: "0", height: "0", opacity: 1 },
          { width: "300px", height: "300px", opacity: 0 },
        ],
        { duration: 600, easing: "ease-out" },
      )

      animation.onfinish = () => ripple.remove()
    })
  })
})
