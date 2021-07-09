import React from "react"
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
} from "native-base";
import { Platform, View, Linking } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
export default function Card({ news }) {
  return (
    <View style={{ alignItems: Platform.OS === "web" ? "center" : null, marginBottom: 10 }}>
      <Box
        width={Platform.OS === "web" ? "70%" : "100%"}
        shadow={1}
        _light={{
          backgroundColor: "gray.50",
        }}
        _dark={{
          backgroundColor: "gray.700",
        }}
      >
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              roundedTop="lg"
              source={{
                uri: news.image,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="red.500"
            _text={{
              color: "white",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom={0}
            px={2}
            py={1}
          >
            PHOTOS
          </Center>
          <Center
            p={1}
            rounded="full"
            bg="red.500"
            boxSize={10}
            position="absolute"
            right={0}
            m={2}
            _text={{
              color: "white",
              textAlign: "center",
              fontWeight: "700",
              fontSize: "xs",
            }}
          >
            {dayjs(news.publishedAt).format('D MMM')}
          </Center>
        </Box>
        <Stack p={4} space={2}>
          <Stack space={2}>
            <Heading size="md" ml={-1} onPress={() => {
              Linking.openURL(news.url)
                .catch(err => {
                  console.error("Failed opening page because: ", err)
                  alert('Failed to open page')
                })
            }}>
              {news.title}
            </Heading>
            <Heading
              size="xs"
              _light={{
                color: "red.500",
              }}
              _dark={{
                color: "red.300",
              }}
              fontWeight="500"
              ml={-0.5}
              mt={-1}
            >
              {news.source.name}
            </Heading>
          </Stack>
          <Text lineHeight={6} fontWeight={400} >
            {news.description}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Icon
                as={<MaterialIcons name="access-time" />}
                color="gray.500"
                size="sm"
              />
              <Text ml={1} color="gray.500" fontWeight="500">
                {dayjs(news.publishedAt).fromNow()}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Icon
                as={<Ionicons name="ios-chatbubbles" />}
                color="gray.500"
                size="sm"
              />

              <Text ml={1} color="gray.500" fontWeight="500">
                39 comments
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </View>
  )
}
