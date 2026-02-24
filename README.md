# Recipe Remix

Recipe Remix is a modern web application that helps users discover recipes based on the ingredients they already have.  
The project focuses on performance, accessibility, and real-world engineering practices.

Live Demo: https://recipe-remix-eta.vercel.app/

## Why this project

I recently started focusing on eating healthier and wanted a practical way to turn available ingredients into meaningful meals.  
This project is both a personal tool and a learning journey, built to explore modern full-stack React development.

## Features (v0.1)

- Input ingredients you have
- View recipe suggestions
- Mobile-first UI
- Accessibility-friendly design
- Performance-focused architecture

## Planned Features (v0.2+)

- AI-powered ingredient substitution
- Recipe scaling
- Meal plan saving
- Nutrition API integration

## Features (Current)

- Instant ingredient search with **debounced filtering** (typing stays smooth)  
- Recipe scoring based on **matched vs missing ingredients**  
- Display of **matched and missing ingredients** per recipe  
- **Full Match Only** toggle to show recipes that match all typed ingredients  
- **Search state persists in the URL** for shareable and bookmarkable results  
- Responsive UI with **clean separation of smart and dumb components**  
- Supports multiple query parameters for easy sharing:  
  e.g., `?ingredients=tomato,salt&fullMatch=true`

## Tech Stack

- **Frontend / Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI components**: shadcn/ui
- **Database**: PostgreSQL (Prisma ORM)
- **Version Control**: Git + GitHub

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/LubbaSaha/recipe-remix.git
cd recipe-remix
