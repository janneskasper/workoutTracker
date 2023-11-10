const {Sequelize, DataTypes, Model} = require("sequelize");
const {GENDER_ENUM_LIST, UNIT_ENUM_LIST, PRIVACY_ENUM_LIST} = require("../enums")
const sequelize = require("../../config/database")
const {generateSalt, encryptPassword} = require("../../utils/encryption")

const Profile = sequelize.define("profile",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.ENUM,
        values: GENDER_ENUM_LIST
    },
    nationality: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    height: {
        type: DataTypes.INTEGER
    }
})

const ProfileIdentification = sequelize.define("profileIdentification", {
    profileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Profile,
            key: "id"
        }
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        get() {
            return () => this.getDataValue("password")
        }
    },
    salt: {
        type: DataTypes.STRING,
        get() {
            return () => this.getDataValue("salt")
        }
    },
    email: {
        type: DataTypes.STRING
    }
})

const ProfileSetting = sequelize.define("profileSetting", {
    profileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Profile,
            key: "id"
        }
    },
    unit: {
        type: DataTypes.ENUM,
        values: UNIT_ENUM_LIST
    },
    profilePrivacy: {
        type: DataTypes.ENUM,
        values: PRIVACY_ENUM_LIST
    }
})

const pswdHookFnc = (profileIdentification) => {
    if (profileIdentification.changed("password")) {
        profileIdentification.salt = generateSalt()
        profileIdentification.password = encryptPassword(profileIdentification.password(), profileIdentification.salt())
    }
}
ProfileIdentification.beforeCreate(pswdHookFnc)
ProfileIdentification.beforeUpdate(pswdHookFnc)
ProfileIdentification.prototype.passwordCorrect = function(password) {
    return encryptPassword(password, this.salt()) === this.password()
}

module.exports = {Profile, ProfileIdentification, ProfileSetting}
