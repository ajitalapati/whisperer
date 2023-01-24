import { Button, Grid, Typography } from "@mui/material";
import HeroSlider, { Overlay, Slide } from "hero-slider";
import { Link } from "react-router-dom";
import { constants } from "../../constants";
import "./LandingPage.css"

const benfranklin =
  "https://cdn.britannica.com/72/110272-050-3CDD8564/Benjamin-Franklin.jpg";
const stevejobs = "https://images.immediate.co.uk/production/volatile/sites/4/2021/04/GettyImages-98328574-hero-72f8c48.jpg";
const ada = "https://daily.jstor.org/wp-content/uploads/2019/10/ada_lovelace_pioneer_1050x700.jpg";
const aristotle = "https://image.cnbcfm.com/api/v1/image/106823064-1610467334769-GettyImages-105929520.jpg";

export default function BasicSlider() {
  return (
    <HeroSlider
      height={"100vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 250,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
        accessability={{
            shouldDisplayButtons: false
        }}
    >
      <Overlay>
        <div className={"landingOverlay"}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={6}
            className={"centerText"}
            >
                <Grid item>
                    <Typography component="h2" variant="h2" align="center" color="common.white">
                        Welcome to Project Whisper
                    </Typography>
                    <Typography component="h1" variant="h4" align="center" color="common.white">
                        Experience History Through Conversation.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography style={{width:"60%", margin: "auto"}} component="h1" variant="body1" align="center" color="common.white" justifyContent="center">
                      Project Whisper is a revolutionary web app that allows you to explore history in a new and personal way. 
                      By conversing with historical figures through advanced AI technology, you'll gain unique insights and perspectives on the past that you won't find in a traditional history book. 
                      Sign up now and start your journey through time, and discover how understanding the past can shape our future.
                    </Typography>
                </Grid>
                <Grid item>
                    <Link to="/options" style={{textDecoration: 'none'}}>
                        <Button variant="contained" style={{backgroundColor: constants.styleColors.mainColor, padding:"10px 50px 10px 50px"}}>Start Talking</Button>
                    </Link>
                </Grid>
            </Grid>
          </div>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Benjamin Franklin"
        background={{
            backgroundImageSrc: benfranklin,
          }}
      />

      <Slide
        shouldRenderMask
        label="Steve Jobs"
        background={{
          backgroundImageSrc: stevejobs
        }}
      />

      <Slide
        shouldRenderMask
        label="Ada Lovelace"
        background={{
          backgroundImageSrc: ada
        }}
      />

      <Slide
        shouldRenderMask
        label="Aristotle"
        background={{
          backgroundImageSrc: aristotle
        }}
      />
    </HeroSlider>
  );
}
