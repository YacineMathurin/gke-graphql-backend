import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

export const errorTypes = {
  BAD_USER_INPUT: {
    errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400,
  },
  ALREADY_EXIST: {
    errorCode: "ALREADY_EXIST",
    errorStatus: 400,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500,
  },
};

export default (errorMessage, errorType) => {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code: errorType.errorCode,
      http: {
        status: errorType.errorStatus,
      },
    },
  });
};
