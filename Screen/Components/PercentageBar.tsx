import React, { useState } from 'react';
import { Text, View } from 'react-native';

interface PercentageBarProps {
    percentage: any;
    height: number;
    backgroundColor: string;
    completedColor: string;
}

const PercentageBar: React.FC<PercentageBarProps> = ({
    percentage,
    height,
    backgroundColor,
    completedColor,
}) => {
    const [getPercentage, setPercentage] = useState<any>(percentage);
    const [getheight, setHeight] = useState<number>(height);
    const [getBackgroundColor, setBackgroundColor] = useState<string>(backgroundColor);
    const [getCompletedColor, setCompletedColor] = useState<string>(completedColor);
    return (
        <View>
            <View style={{ justifyContent: 'center' }}>
                <View
                    style={{
                        width: '100%',
                        height: getheight,
                        marginTop: 10,
                        marginBottom: getPercentage == '0%' ? 0 : 10,
                        borderRadius: 5,
                        borderColor: getBackgroundColor,
                        borderWidth: 1,
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        marginVertical: 10,
                        borderRadius: 5,
                        backgroundColor: getCompletedColor,
                        position: 'absolute',
                        bottom: 20,
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getPercentage == '0%' ? 0 : getheight,
                        bottom: 10,
                    }}
                >
                    <Text style={{ textAlign: 'right', color: 'black' }}>{getPercentage}</Text>
                </View>
            </View>
        </View>
    );
};

export default PercentageBar;