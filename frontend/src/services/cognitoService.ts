import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_lJSlUSa5s",
    ClientId: "5pu89ctsj7tr00rb81a7kvn0ed"
}

export default new CognitoUserPool(poolData)