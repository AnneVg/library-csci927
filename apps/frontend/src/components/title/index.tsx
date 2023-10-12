import { useLink } from "@refinedev/core";
import { theme } from "antd";

import { BikeWhiteIcon, UowLibraryIcon } from "../../components";
import { Logo } from "./styled";

const { useToken } = theme;

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { token } = useToken();
    const Link = useLink();

    return (
        <Logo>
            <Link to="/">
                {collapsed ? (
                    <BikeWhiteIcon
                        style={{
                            fontSize: "32px",
                            color: token.colorTextHeading,
                        }}
                    />
                ) : (
                    <Link to="/">
                        <img
                            style={{ marginBottom: 2 }}
                            src="/images/uow-login-logo.png"
                            alt="Logo"
                            width="100%"
                        />
                    </Link>
                )}
            </Link>
        </Logo>
    );
};
