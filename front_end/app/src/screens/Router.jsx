import { memo, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import UserStack from './UserStack';

function Router() {
    return (
        <NavigationContainer>
            <UserStack />
        </NavigationContainer>
    )
}

export default memo(Router)
