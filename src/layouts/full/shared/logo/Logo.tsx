import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  const router = useRouter();

  return (
    <LinkStyled href={{
      pathname: '/',
      query: router.query
    }}>
      <Image
        src="/images/logos/logo.svg"
        alt="logo"
        height={70}
        width={174}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
