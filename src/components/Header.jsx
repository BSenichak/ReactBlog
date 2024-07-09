import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SecrchBar from "./SecrchBar";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeSwitchToggler from "./ThemeSwitchToggler";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
    Card,
    Collapse,
    Drawer,
    Fade,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
    Divider,
    Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';

let aboutLink = {
    t: "header.links.about",
    link: "/about",
    items: [
        {
            t: "header.links.about",
            link: "/about",
        },
        {
            t: "header.links.team",
            link: "/team",
        },
        {
            t: "header.links.awards",
            link: "/awards",
        },
        {
            t: "header.links.contacts",
            link: "/contacts",
        },
        {
            t: "header.links.partners",
            link: "/partners",
        },
        {
            t: "header.links.documents",
            link: "/documents",
        },
        {
            t: "header.links.contract_offer",
            link: "/contract_offer",
        },
        {
            t: "header.links.reports",
            link: "/reports",
        },
    ],
};

let projectsLink = {
    t: "header.links.projects",
    link: "/projects",
    items: [
        {
            t: "header.links.charity_projects",
            link: "/charity_projects",
        },
        {
            t: "header.links.cultural_projects",
            link: "/cultural_projects",
        },
        {
            t: "header.links.philanthropy",
            link: "/philanthropy",
        },
        {
            t: "header.links.education",
            link: "/education",
        },
        {
            t: "header.links.festivals",
            link: "/festivals",
        },
    ],
};

export default function Header() {
    let isMobile = useMediaQuery("(max-width: 600px)");
    let isTablet = useMediaQuery("(max-width: 1000px)");
    let [sideBar, setSideBar] = useState(false);
    let [userMenu, setUserMenu] = useState(false);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                {isMobile && <LogoBar />}
                <Toolbar>
                    {isTablet && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => setSideBar(!sideBar)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    {!isMobile && <LogoBar />}
                    <SecrchBar />
                    {!isTablet && (
                        <>
                            <LinksBar />
                            <Btns>
                                <LanguageSelect />
                                <ThemeSwitchToggler />
                            </Btns>
                        </>
                    )}
                    <IconButton onClick={(e) => setUserMenu(e.currentTarget)}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                            <PersonIcon />
                        </Avatar>
                    </IconButton>
                    <UserMenu state={userMenu} toggle={setUserMenu} />
                </Toolbar>
            </AppBar>
            <Drawer
                open={sideBar && isTablet}
                onClose={() => setSideBar(false)}
            >
                <DrawerContent state={(s) => setSideBar(s)} />
            </Drawer>
        </Box>
    );
}

let Btns = styled(Box)`
    display: flex;
    align-items: center;
`;

const LogoBar = () => {
    let { t } = useTranslation();
    let theme = useTheme();
    return (
        <LogoWrapper theme={theme} to="/">
            <Logo src="/images/bigLogo.svg" />
            <LogoContent>
                <p>{t("header.title")}</p>
                <p>{t("header.subtitle")}</p>
            </LogoContent>
        </LogoWrapper>
    );
};

let Logo = styled.img`
    height: 2rem;
    margin-right: 0.3rem;
`;

let LogoWrapper = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.secondary};
    padding: 0.3rem 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    min-width: 180px;
`;

let LogoContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1rem;
    p:nth-child(1) {
        font-size: 1.4rem;
    }
    p:nth-child(2) {
        font-size: 0.8rem;
    }
`;

let LinksBar = () => {
    let goTo = useNavigate();
    return (
        <LinksBarWrapper>
            <LinkItem data={aboutLink} />
            <LinkItem data={projectsLink} />
            <IconButton onClick={() => goTo("/calendar")}>
                <CalendarMonthIcon />
            </IconButton>
            <IconButton onClick={() => goTo("/media")}>
                <PermMediaIcon />
            </IconButton>
            <IconButton onClick={() => goTo("/support")}>
                <HandshakeIcon />
            </IconButton>
        </LinksBarWrapper>
    );
};

let LinksBarWrapper = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: 0.5rem;
    padding: 0 0.5rem;
`;

let LinkItemWrapper = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.secondary};
    padding: 0.3rem 0.5rem;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    position: relative;
`;

let LinkItem = ({ data }) => {
    let { t } = useTranslation();
    let theme = useTheme();
    const [menu, setMenu] = useState(null);
    return (
        <div style={{ position: "relative" }}>
            <LinkItemWrapper
                to={data.link}
                theme={theme}
                onMouseEnter={(event) => {
                    setMenu(event.currentTarget);
                }}
                onMouseLeave={() => {
                    setMenu(null);
                }}
            >
                {t(data.t)}
            </LinkItemWrapper>
            <Fade in={Boolean(menu)} timeout={500}>
                <SubMenu
                    theme={theme}
                    onMouseEnter={(event) => {
                        setMenu(event.currentTarget);
                    }}
                    onMouseLeave={() => {
                        setMenu(null);
                    }}
                >
                    {data.items &&
                        data.items.map((item) => (
                            <SubLink to={item.link} theme={theme} key={item.t}>
                                <MenuItem onClick={() => setMenu(null)}>
                                    {t(item.t)}
                                </MenuItem>
                            </SubLink>
                        ))}
                </SubMenu>
            </Fade>
        </div>
    );
};

let SubLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
`;

let SubMenu = styled(Card)`
    position: absolute;
    top: 2rem;
`;

let DrawerContent = ({ state }) => {
    let { t } = useTranslation();
    let [aboout, setAbout] = useState(false);
    let [projects, setProjects] = useState(false);
    let goto = useNavigate();
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => state(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                <ListItemButton onClick={() => setAbout(!aboout)}>
                    <ListItemText>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {t(aboutLink.t)}{" "}
                            {
                                <ExpandLess
                                    style={
                                        aboout
                                            ? {
                                                  transform: "rotate(0deg)",
                                                  transition: "transform 0.5s",
                                              }
                                            : {
                                                  transform: "rotate(180deg)",
                                                  transition: "transform 0.5s",
                                              }
                                    }
                                />
                            }
                        </Box>
                    </ListItemText>
                </ListItemButton>
                <Collapse in={aboout}>
                    <List>
                        {aboutLink.items.map((item) => (
                            <ListItemButton
                                key={item.t}
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    state(false);
                                    goto(item.link);
                                }}
                            >
                                <ListItemText
                                    primary={t(item.t)}
                                ></ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setProjects(!projects)}>
                    <ListItemText>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {t(projectsLink.t)}{" "}
                            {
                                <ExpandLess
                                    style={
                                        projects
                                            ? {
                                                  transform: "rotate(0deg)",
                                                  transition: "transform 0.5s",
                                              }
                                            : {
                                                  transform: "rotate(180deg)",
                                                  transition: "transform 0.5s",
                                              }
                                    }
                                />
                            }
                        </Box>
                    </ListItemText>
                </ListItemButton>
                <Collapse in={projects}>
                    <List>
                        {projectsLink.items.map((item) => (
                            <ListItemButton
                                key={item.t}
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    state(false);
                                    goto(item.link);
                                }}
                            >
                                <ListItemText
                                    primary={t(item.t)}
                                ></ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
                <ListItemButton
                    onClick={() => {
                        goto("/calendar");
                        state(false);
                    }}
                >
                    <ListItemIcon>
                        <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText>{t("header.links.calendar")}</ListItemText>
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        goto("/media");
                        state(false);
                    }}
                >
                    <ListItemIcon>
                        <PermMediaIcon />
                    </ListItemIcon>
                    <ListItemText>{t("header.links.media")}</ListItemText>
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        goto("/support");
                        state(false);
                    }}
                >
                    <ListItemIcon>
                        <HandshakeIcon />
                    </ListItemIcon>
                    <ListItemText>{t("header.links.support")}</ListItemText>
                </ListItemButton>
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                }}
            >
                <LanguageSelect />
                <ThemeSwitchToggler />
            </Box>
        </>
    );
};

let UserMenu = ({ state, toggle }) => {
    let user = useSelector((state) => state.auth.user);
    let goto = useNavigate();
    let { t } = useTranslation();
    return (
        <Menu
            id="basic-menu"
            anchorEl={state}
            open={Boolean(state)}
            onClose={() => toggle(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            {!user ? (
                <Box>
                    <MenuItem
                        onClick={() => {
                            toggle(null);
                            goto("/profile");
                        }}
                    >
                        <ListItemIcon>
                            <BadgeIcon />
                        </ListItemIcon>
                        {t("header.links.profile")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            toggle(null);
                            goto("/add-news");
                        }}
                    >
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        {t("header.links.add_news")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            toggle(null);
                            goto("/chats");
                        }}
                    >
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        {t("header.links.chats")}
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                        onClick={() => {
                            toggle(null);
                            goto("/logout");
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        {t("header.links.logout")}
                    </MenuItem>
                </Box>
            ) : (
                <Box>
                    <MenuItem
                        onClick={() => {
                            toggle(null);
                            goto("/login");
                        }}
                    >
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        {t("header.links.login")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            toggle(null);
                            goto("/register");
                        }}
                    >
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        {t("header.links.register")}
                    </MenuItem>
                </Box>
            )}
        </Menu>
    );
};
