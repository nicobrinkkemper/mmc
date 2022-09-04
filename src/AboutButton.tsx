import Button from "Button";

const AboutButton = () => (
  <Button inverted={true} icon={"info-inverted"} to="#!/about" classList={['AboutBtn']}>
    About
  </Button>
);

export { AboutButton };
