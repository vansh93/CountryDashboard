# Country Data Dashboard

A Next.js 13 application built with TypeScript that fetches country data from a REST API and displays it in an interactive dashboard. This project utilizes the App Router and features client-side state management, data fetching, and performance optimizations like lazy loading and SSR.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Performance Optimizations](#performance-optimizations)
- [Advanced Features](#advanced-features)
- [License](#license)

## Features

- Fetches real-time country data from the REST API endpoint: `https://restcountries.com/v3.1/all`.
- Displays data in a responsive grid layout with country cards.
- Client-side sorting, filtering, and search functionalities.
- Detailed view for each country, including information like population, region, capital, currencies, languages, and time zones.
- Lazy loading of country cards for improved performance.
- Dark mode toggle with persistent user preference.
- Server-side rendering (SSR) for initial page load.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/country-dashboard.git
   cd country-dashboard

### How to start 
-npm run dev