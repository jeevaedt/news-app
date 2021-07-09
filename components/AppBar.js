import React, { useState } from "react";
import { View, Platform } from 'react-native';
import { VStack, HStack, Button, IconButton, Icon, Text, Box, StatusBar, Input, Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

function AppBar({ searchValue, setSearchValue, navigation, ...props }) {
    const [searchEnabled, setSearchEnabled] = useState(false);
    console.log(searchValue)

    function onClose() {
        setSearchEnabled(false);
        setSearchValue("");
    }

    return (
        <>
            <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
            <Box safeAreaTop backgroundColor="#100c08" />
            <HStack bg='#100c08' px={1} py={3} justifyContent='space-between' alignItems='center'>
                <HStack space={4} alignItems='center'>
                    {Platform.OS !== "web" &&
                        <IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} />
                    }
                    <Text color="white" marginLeft={Platform.OS === "web" ? 10 : 0} fontSize={20} fontWeight='bold'>News</Text>
                </HStack>
                {Platform.OS === "web" || searchEnabled ?
                    <View>
                        <Input
                            w={Platform.OS !== "web" ? "60%" : ""}
                            mx={3}
                            variant={Platform.OS !== "web" ? "underlined" : "outline"}
                            placeholder="Search"
                            // _light={{
                            //     placeholderTextColor: "blueGray.400",
                            // }}
                            // _dark={{
                            //     placeholderTextColor: "blueGray.50",
                            // }}
                            isFullWidth={false}
                            color="white"
                            value={searchValue || ""}
                            onChangeText={setSearchValue}
                            InputRightElement={<Icon as={<MaterialIcons name='clear' onPress={onClose} />} />}
                        />
                    </View>
                    : <HStack space={2}>
                        {/* <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} /> */}
                        <IconButton icon={<Icon as={<MaterialIcons name='search' onPress={() => setSearchEnabled(true)} />}
                            color="white" size='sm' />} />
                        {/* <IconButton icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} /> */}
                    </HStack>}
            </HStack>

        </>
    )
}
export default AppBar;
