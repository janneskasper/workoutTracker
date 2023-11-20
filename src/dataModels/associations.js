const {Profile, ProfileIdentification, ProfileSetting} = require("./models/profileModels")
const Message = require("./models/messageModels")
const Activity = require("./models/activityModels")
const Achievement = require("./models/achievementModels")
const {Exercise, Workout, WorkoutDay, WorkoutProgram} = require("./models/workoutModels")

Message.hasOne(Profile, {foreignKey: "id", as: "sender"})
Message.hasOne(Profile, {foreignKey: "id", as: "receiver"})
Profile.hasMany(Message)

Activity.belongsTo(Profile)
Activity.belongsTo(Exercise)
Activity.belongsTo(Workout)
Exercise.hasMany(Activity)
Workout.hasMany(Activity)
Profile.hasMany(Activity)

Achievement.belongsToMany(Profile, {through: "achievementProfile"})
Profile.belongsToMany(Achievement, {through: "achievementProfile"})

Profile.hasOne(ProfileSetting)
ProfileSetting.belongsTo(Profile)
Profile.hasOne(ProfileIdentification)
ProfileIdentification.belongsTo(Profile)
Profile.belongsToMany(Profile, {through: "profileFriends", as: "friends"})
Profile.belongsToMany(WorkoutProgram, {through: "profileProgram"})
WorkoutProgram.belongsToMany(Profile, {through: "profileProgram"})
Profile.belongsToMany(Workout, {through: "profileWorkout"})
Workout.belongsToMany(Profile, {through: "profileWorkout"})

Exercise.belongsToMany(Workout, {through: "exerciseWorkout"})
Workout.belongsToMany(Exercise, {through: "exerciseWorkout"})
Exercise.belongsToMany(WorkoutProgram, {through: "exerciseWorkoutProgram"})
WorkoutProgram.belongsToMany(Exercise, {through: "exerciseWorkoutProgram"})
Exercise.belongsToMany(WorkoutDay, {through: "exerciseWorkoutDay"})
WorkoutDay.belongsToMany(Exercise, {through: "exerciseWorkoutDay"})
Workout.belongsToMany(WorkoutDay, {through: "workoutWorkoutDay"})
WorkoutDay.belongsToMany(Workout, {through: "workoutWorkoutDay"})
WorkoutDay.belongsToMany(WorkoutProgram, {through: "workoutDayProgram"})
WorkoutProgram.belongsToMany(WorkoutDay, {through: "workoutDayProgram"})