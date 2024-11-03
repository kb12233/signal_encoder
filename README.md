# Signal Encoder

[![GitHub pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)](https://kb12233.github.io/signal_encoder/)

Signal Encoder is a simple React application that takes digital data (in binary form) as input and outputs the digital signal using various encoding techniques. This tool is useful for visualizing and understanding different signal encoding schemes commonly used in digital communication.

## Demo

Check out the live demo here: [Signal Encoder on GitHub Pages](https://kb12233.github.io/signal_encoder/)

## Features

The application supports the following encoding techniques:
- **NRZ-L** (Non-Return-to-Zero Level)
- **NRZ-I** (Non-Return-to-Zero Inverted)
- **Bipolar AMI** (Alternate Mark Inversion)
- **Pseudoternary**
- **Manchester**
- **Differential Manchester**

## Built With

- **Vite** - A fast build tool for modern web apps
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **ShadCN UI Library** - UI components built on top of Tailwind CSS

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kb12233/signal_encoder.git
   cd signal_encoder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the app**:
   Open your browser and go to `http://localhost:3000`.

## Usage

1. Input a binary sequence.
2. Press the "Encode" button.
3. Observe the output, which displays the digital signal using various encoding techniques.

## Deployment

The application is deployed on GitHub Pages and automatically updates with changes pushed to the main branch.


## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repo and submit a pull request.