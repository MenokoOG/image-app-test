import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/react";

const Navbar = () => (
    <Flex bg="gray.900" p="4" justify="space-between" align="center" color="white">
        <Box>
            <Link href="/" fontSize="xl">
                Home
            </Link>
        </Box>

    </Flex>
);

export default Navbar;