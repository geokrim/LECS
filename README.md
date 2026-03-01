# LECS — Premium Salon Software
An all-in-one salon management platform that unifies customer relationships, financial intelligence, inventory control, and targeted marketing into a single, cohesive experience built for premium salons.


## Overview

LECS is a comprehensive, browser-based management system engineered from the ground up for the operational demands of high-end salon businesses. Rather than stitching together disparate tools, LECS provides a unified workspace where every dimension of salon management — from a client's coloring history to monthly cash flow analytics — is interconnected, accessible, and actionable.


### Customer Relationship Management
Detailed client profiles with full visit history and service logs
Specialized service tracking (e.g., *vafeio* — color treatments and formulations)
Service preference records for personalized client experiences

### Financial Management
Real-time cash flow monitoring and expense categorization
Revenue dashboards with period-over-period comparison
Detailed financial statistics for data-driven decision-making

### Inventory & Stock Control
Categorized stock management with usage tracking per service
Automated stock-level statistics and consumption reports
Inventory alerts to prevent supply disruptions

### Marketing & Communication
Integrated SMS campaign management with segmentation support
Custom messaging templates and broadcast scheduling
Full sent-history log for campaign auditing and analytics

### Scheduling & Staff Management
Appointment calendar with multi-staff support
People module for employee and role management
Day/week/month scheduling views

### Analytics & Reporting
Charts for sales trends, service breakdowns, and growth analysis
Powered by D3.js, Chart.js, and Chartist for data visualization

### Frontend
HTML5 -> Application markup 
Bootstrap 4 -> Grid and UI component framework 
Sass (SCSS) -> Stylesheet architecture
jQuery-> DOM and AJAX interactions 

### Visualization & UI Libraries
D3.js -> Custom, data-driven SVG visualizations 
Chart.js -> Canvas-based charting for dashboards 
Chartist -> Responsive charts 
Selectize.js -> Enhanced select inputs and tagging 
DatatablesInteractive -> Sortable data tables 
Moment.jsDate -> parsing, formatting, and manipulation

### Build Tooling
npm -> Dependency management 
Grunt -> Task automation (compilation, minification, watch) 
Bower -> Frontend package resolution 


## Architecture Overview
lecs/
├── app/                  # Core application modules (routing, views, controllers)
│   ├── customers/        # CRM module
│   ├── financials/       # Cash flow and expense tracking
│   ├── inventory/        # Stock management
│   ├── marketing/        # SMS campaigns and messaging
│   ├── scheduling/       # Appointments and calendar
│   └── analytics/        # Reporting and chart views
│
├── jsGasoum/             # Custom business logic and domain-specific utilities
│
├── lib/                  # Third-party vendor libraries (Bower-managed)
│
├── scss/                 # Sass source files
│   ├── base/             # Global resets, variables, and typography
│   ├── components/       # Reusable UI component styles
│   └── modules/          # Feature-specific stylesheets
│
├── Gruntfile.js          # Build task configuration
├── package.json          # npm manifest
└── bower.json            # Frontend dependency manifest

app/ -> houses all feature modules, each encapsulating its own views and logic for clean separation.
jsGasoum/ -> contains domain-specific business logic and helpers tailored to salon operations.
lib/ -> is the vendor directory managed by Bower, keeping third-party code isolated from application source. 
scss/ -> is organized to reflect a scalable ITCSS-inspired architecture with clearly scoped partials.
