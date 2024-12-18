import { Button } from "../../ui/button";
import { useRef, useState } from "react";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "../../../assets/Logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { white } from "tailwindcss/colors";
import axios from 'axios';


const Navbar = () => {
  const [isHidden, setisHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const Navigator = useNavigate();

  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState(null);
  const [UserName, setUserName] = useState("");

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);

        const options = {
          method: 'GET',
          url: 'https://sandbox-api.okto.tech/api/v1/user_from_token',
          headers: { Authorization: `Bearer ${authResponse.auth_token}` }
        };

        await axios.request(options).then((res) => {
          setUserName(res.data.data.email);
        }).catch((err) => {
          console.log(`The Error is oocured : ${err}`)
        })

      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
  };


  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setisHidden(diff > 0);
      lastYRef.current = y;
    }
  });

  return (
    <motion.nav
      className="navbar-container flex justify-around items-center w-full h-20 bg-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
    >
      <motion.div
        animate={isHidden ? "hidden" : "visible"}
        onFocusCapture={() => setisHidden(false)}
        whileHover="visible"
        variants={{
          hidden: {
            y: "-100%",
          },
          visible: {
            y: "0%",
          },
        }}
        transition={{ duration: 0.3 }}
        className="nav-list w-fit h-16 z-20 px-8 list-none flex flex-row justify-center items-center fixed rounded-full border border-neutral-700 bg-gray-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-black"
      >
        <img src={Logo} alt="" className=" h-20 w-16 rounded-xl py-4" />
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Pricing</Button>
        <Button variant="ghost">Contact</Button>
        <NavigationMenu className=" dark ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" hover:bg-accent hover:text-accent-foreground text-lg font-light">
                Go To Feature
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <img src={Logo} alt=" h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Go to the feature
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Write Any relevent things here
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <a href="/docs" title="Introduction" className=" font-thin hover:bg-gray-700">
                    <p className=" font-bold ">Community</p>
                    Get the latest news about Goverment Subsidies and news in Farming
                  </a>

                  <a
                    href="/docs/installation"
                    title="Installation"
                    className=" font-thin hover:bg-gray-700"
                  >
                    <p className=" font-bold ">Installation</p>
                    How to install dependencies and structure your app.
                  </a>

                  <a
                    href="/docs/primitives/typography"
                    title="Typography"
                    className=" font-thin hover:bg-gray-700"
                  >
                    <p className=" font-bold ">Typography</p>
                    Styles for headings, paragraphs, lists...etc.
                  </a>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <Button variant="ghost">Sign In</Button> */}
        {!authToken ? (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => console.error("Login Failed", error)}
          />
        ) : <><p style={{ color: white }}>{UserName}</p></>}

        &nbsp;

        {authToken && (
          <Button onClick={() => {
            Navigator("/dashboard")
          }} variant="ghost"> Go to Dashboard </Button>
        )}


      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
