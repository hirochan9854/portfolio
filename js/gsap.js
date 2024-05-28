gsap.utils.toArray(".fadeInUp").forEach((target, i) => {
  gsap.from(target, {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: target,
      start: "top 80%",
      toggleActions: "play none none reverse",
      delay: i * 0.8,
    },
  });
});
