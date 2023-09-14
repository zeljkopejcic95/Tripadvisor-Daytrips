## Trip advisor

---

This app handles User authentication and CRUD operations for Day Trip, Day Trip Reviews and Booking Day Trip.

### Available endpoints related to user authentication:

- `POST http://localhost:3000/register` - Register user. Expected payload is: `username` and `password`
- `POST http://localhost:3000/login` - Login user, using passport authentication middleware with local strategy
- `POST http://localhost:3000/logout` - Logout user, using passport `logout` function

### Available endpoints for Day Trip:

- `GET http://localhost:3000/dayTrip` - Lists all Day trips
- `POST http://localhost:3000/dayTrip` - Creates new Day trip. Expected payload: `name`, `price`, `description`
- `GET http://localhost:3000/dayTrip/<id>` - Fetches a Day trip by ID
- `PUT http://localhost:3000/dayTrip/<id>` - Updates Day trip
- `DELETE http://localhost:3000/dayTrip/<id>` - Deletes Day trip

### Available endpoints for Day Trip Reviews:

- `GET http://localhost:3000/dayTrip/<id>/reviews` - Lists all Day trip reviews
- `POST http://localhost:3000/dayTrip/<id>/reviews` - Creates new Day Trip Review. Expected payload: `body`, `rating`
- `PUT http://localhost:3000/dayTrip/<id>/reviews/<reviewId>` - Updates Day Trip Review
- `DELETE http://localhost:3000/dayTrip/<id>/reviews/<reviewId>` - Deletes Day trip Review

### Available endpoint for Booking Day Trip:

- `GET http://localhost:3000/dayTrip/<daytripId>/booking/<travelerId>` - Lists all Booked Day trips for current user
- `POST http://localhost:3000/dayTrip/<daytripId>/booking/` - Creates new Booking for Day trip. Expected payload: `travel date`
