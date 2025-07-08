# Sustainability E-Commerce Website with AI Integration

This repository contains the code for my mini project as a student, focused on building a sustainable e-commerce platform enhanced with AI features. The project demonstrates my learning in full-stack web development, backend integration, and basic AI/ML service usage.

---

## Project Overview

This mini project aims to:
- Promote sustainable shopping through a modern e-commerce website
- Integrate AI for product recommendations or analysis
- Practice full-stack development using React, Node.js, Python, and Django

---

## Features
- User registration and login
- Product listing and management
- AI-powered product analysis (using Python backend)
- Admin dashboard (Django)
- Responsive frontend (React)

---

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js/Express, Python (Flask/FastAPI), Django
- **Database:** MongoDB (Node backend)
- **AI Integration:** Hugging Face or similar APIs (Python backend)

---

## Project Structure
```
my-app (2)/
  ├── my-app/
  │   ├── backend/           # Node.js/Express backend
  │   ├── backend-node/      # (Additional Node.js backend)
  │   ├── backend-python/    # Python backend (AI/ML services)
  │   └── frontend/          # React frontend + Django backend
  └── ...
```

---

## How to Run (For Reviewers/Faculty)

### 1. Clone the repository
```sh
git clone https://github.com/GanjiManogna/sustainability-e-commerece-webiste-with-AI-integration.git
cd sustainability-e-commerece-webiste-with-AI-integration
```

### 2. Install dependencies
- For Node.js backend: `cd my-app/backend && npm install`
- For Python backend: `cd my-app/backend-python && pip install -r requirements.txt`
- For Django backend: `cd my-app/frontend/backend && pip install -r requirements.txt`
- For React frontend: `cd my-app/frontend && npm install`

### 3. Start the services
- Node.js backend: `npm start`
- Python backend: `python app.py`
- Django backend: `python manage.py runserver`
- React frontend: `npm start`

---

## Notes
- This project is for academic purposes and may use test/demo API keys.
- AI features are basic and for demonstration only.
- Please contact me for any questions or clarifications regarding the code or setup.

---

## Acknowledgements
- [Hugging Face](https://huggingface.co/) for AI APIs
- [MongoDB](https://www.mongodb.com/), [React](https://reactjs.org/), [Node.js](https://nodejs.org/), [Django](https://www.djangoproject.com/)

---

**Submitted by:**
Ganji Manogna

**Mini Project for Academic Evaluation** 

---

## AI-Powered Resell/Redesign Feature

This project includes an AI-powered resell/redesign page that allows users to upload a product image and describe how they want it redesigned. The app uses Stable Diffusion with ControlNet (Canny) to generate a new, detailed version of the product while preserving its shape.

**How it works:**
- Canny edge detection extracts the product's shape.
- Stable Diffusion with ControlNet generates a new image based on your prompt and the original shape.
- The redesigned image is displayed instantly in a Gradio web interface.

**How to Run:**
1. Set your Hugging Face token as an environment variable:
   - On Windows CMD:
     ```cmd
     set HF_TOKEN=your_huggingface_token_here
     ```
2. Install dependencies:
   ```sh
   pip install gradio diffusers transformers accelerate opencv-python pillow numpy huggingface_hub
   ```
3. Run the redesign app:
   ```sh
   python my-app/backend-python/redesign_app.py
   ```
4. Open the Gradio link shown in your terminal (e.g., http://127.0.0.1:7860 or the public share link).

**Note:** Requires a CUDA-enabled GPU and a valid Hugging Face account for model access. 