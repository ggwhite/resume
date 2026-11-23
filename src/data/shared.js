import Photo from '@/assets/portrait.jpg'

export const contact = {
  email: "ggw.chang@gmail.com",
  phone: "+886 928827611",
  github: "https://github.com/ggwhite",
  linkedin: "https://linkedin.com/in/white-chang",
  photo: Photo,
}

export const programming = {
  "Golang": ["Gin", "Dig", "Cobra", "Viper", "gRPC"],
  "Java": ["Spring", "Spring Boot", "MyBatis"],
  "Python": [],
  "Lua": ["Skynet"],
  "Javascript & Node.js": ["Vue.js", "Nuxt.js", "TypeScript", "jQuery"],
  "PHP": ["Laravel"],
  "HTML & CSS": ["Tailwind CSS", "Bootstrap"],
}

// Open-source repositories. Star counts are from the GitHub API (checked 2026-11-23);
// counts under 10 are not shown.
export const repos = {
  "memory-mcp": { url: "https://github.com/ggwhite/memory-mcp", lang: "Go" },
  "jarvis": { url: "https://github.com/ggwhite/jarvis", lang: "TypeScript" },
  "4x": { url: "https://github.com/ggwhite/4x", lang: "Go", stars: "35", archived: true },
  "go-masker": { url: "https://github.com/ggwhite/go-masker", lang: "Go", stars: "130+" },
}
