import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Welcome to the Image Explorer
            </Heading>
            <Text color={"gray.500"}>
                Click below to explore images and learn more about them!
            </Text>
            <Button
                mt={4}
                as={Link}
                to="/image/1"
                colorScheme="teal"
            >
                Get Started
            </Button>
        </Box>
    </motion.div>
);

export default HomePage;