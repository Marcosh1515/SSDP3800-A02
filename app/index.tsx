import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href="./pokemon/1">Go to Pokemon</Link>
    </SafeAreaView>
  );
}
