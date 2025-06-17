# Welcome to the Canarin App

Canarin is a project developed using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app), a technology by [Expo](https://expo.dev).

The goal of this project is to build a simple mobile application with bidirectional communication between devices, semi-offline capabilities, and a unified experience for both end-users and bus drivers (who control the flow and route).

## Technologies Used

- **Frontend:** React Native (Expo), TypeScript, Axios, AsyncStorage, React Navigation, react-native-size-matters, react-native-responsive-fontsize
- **Backend:** Node.js, NestJS, Prisma ORM, TypeScript, Express
- **Database:** PostgreSQL (recommended), SQLite (for development/testing)
- **Other:** Expo Go, Android/iOS emulators

## Project Structure

- **frontend/**: React Native app (Expo) for user and driver interfaces.
- **backend/**: Node.js (NestJS) API for authentication, user management, and business logic.
- **models/**: Shared TypeScript interfaces and DTOs.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview) (for backend)
- (Optional) Android Studio or Xcode for emulators/simulators

### Environment Variables

Create a `.env` file in the `frontend` and `backend` directories as needed.

#### Example for frontend (`frontend/.env`):

```
EXPO_PUBLIC_SERVER_URL=http://<your-local-ip>:3000
EXPO_PUBLIC_USER_REGISTER=/users/register
EXPO_PUBLIC_USER_GETUSER=/users/getUser
```

- `EXPO_PUBLIC_SERVER_URL`: Backend base URL.
- `EXPO_PUBLIC_USER_REGISTER`: User registration endpoint.
- `EXPO_PUBLIC_USER_GETUSER`: Endpoint to get user by login.

#### Example for backend (`backend/.env`):

```
#App
LOG_LEVEL='log,error,warn'
SERVER_PORT=3000

#Database
DATABASE_URL="file:./canarin.db"
GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_KEY"
```

- `DATABASE_URL`: Database connection string (PostgreSQL or SQLite).
- `SERVER_PORT`: Backend server port (default: 3000).
- `LOG_LEVEL`: NestJS log levels.
- `GOOGLE_MAPS_API_KEY`: Google Maps API key (if applicable).

### Installing Dependencies

Install dependencies for both frontend and backend:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Running the Backend

```bash
cd backend
npm run start:dev
```

The backend will start on `http://localhost:3000` by default.

### Running the Frontend

```bash
cd frontend
npx expo start
```

You will see options to run the app on:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Choose the option that best fits your environment.

### Database Setup

1. Set up your PostgreSQL database (or SQLite for testing).
2. Run Prisma migrations:

```bash
cd backend
npx prisma migrate dev
```

3. (Optional) To visualize the database, use Prisma Studio:

```bash
npx prisma studio
```

### API Endpoints

#### User Registration

- **POST** `/users/register`
- **Body:**
  ```json
  {
    "login": "email@example.com",
    "password": "password123",
    "person": {
      "name": "Name",
      "lastName": "LastName",
      "cpf": "12345678900",
      "phones": {
        "cellPhone": "47999999999"
      }
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User ID 1 created!"
  }
  ```

#### Get User by Login

- **GET** `/users/getUser?login=email@example.com`
- **Response:**
  ```json
  {
    "success": true,
    "message": {
      "id": 1,
      "login": "email@example.com",
      "userTypeId": 2,
      "personId": 1,
      "active": true,
      ...
    }
  }
  ```

### Authentication Flow

Currently, login is performed only by searching for the user via email/login. JWT authentication is not implemented at this time. For production, it is recommended to implement secure authentication (JWT or OAuth).

## Useful Documentation

- [Expo Documentation](https://docs.expo.dev/): Learn the basics or explore advanced topics.
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/): Step-by-step guide to create a cross-platform project.

## Team

This project is developed by students of the 6th semester (20251) of the Software Engineering course at Centro Universitário Católica SC de Jaraguá do Sul.

<div align="center">
<table>
  <tr>
    <td align="center"><a href="https://github.com/Gabrid-0"><img loading="lazy" src="https://avatars.githubusercontent.com/u/148984768?v=4" width="115"><br><sub>Gabriel de Oliveira</sub></a></td>
    <td align="center"><a href="https://github.com/HigorAz"><img loading="lazy" src="https://avatars.githubusercontent.com/u/141787745?v=4" width="115"><br><sub>Higor Azevedo</sub></a></td>
    <td align="center"><a href="https://github.com/AoiteFoca"><img loading="lazy" src="https://avatars.githubusercontent.com/u/141975272?v=4" width="115"><br><sub>Nathan Cielusinski</sub></a></td>
    <td align="center"><a href="https://github.com/MrNicolass"><img loading="lazy" src="https://avatars.githubusercontent.com/u/80847876?v=4" width="115"><br><sub>Nicolas Gustavo Conte</sub></a></td>
  </tr>
</table>
</div>

## Troubleshooting

- Make sure your backend server is accessible from your mobile device (use your local IP address in `.env`).
- If you have issues with dependencies, try deleting `node_modules` and reinstalling.
- For more help, check the official documentation links above.

## License

This project is academic and does not have a commercial license. For use, modification, or distribution, consult the authors.
