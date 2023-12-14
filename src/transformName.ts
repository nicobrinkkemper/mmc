import _ from "lodash";
// stip all special characters and replace with underscore, remove double underscore
// replace trailing and leading underscore with nothing
function stripSpecialChars(str: string) {
  return _.snakeCase(
    str.replace(/[\W_]+/g,"_").toLowerCase()
  )
}

const transformName = (name: string) => {
  return stripSpecialChars(
    name.split("[5ymm] ").join("").split("[7MMC] ").join("")
  );
};

export { transformName };
