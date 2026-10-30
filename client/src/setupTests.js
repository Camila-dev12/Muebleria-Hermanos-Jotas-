// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// React Router 7 usa TextEncoder, que el entorno de pruebas de create-react-app (jsdom) no incluye.
Object.assign(global, { TextEncoder, TextDecoder });
