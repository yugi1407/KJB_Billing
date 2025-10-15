import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert, BackHandler } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-blob-util';
import { useTheme } from 'src/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'; // ✅ ADD useRoute

const HtmlPdfView = () => {
    const navigation = useNavigation();
    const route = useRoute(); // ✅ use route params

    // ✅ Extract values safely
    const { htmlContent, fileName = 'Details' } = route.params || {};

    console.log("htmlContent:", htmlContent);

    const { Colors, Fonts, Layout, Gutters } = useTheme();
    const [filePath, setFilePath] = useState('');

    useEffect(() => {
        const generatePdf = async () => {
            try {
                if (!htmlContent) {
                    console.log("No HTML content provided");
                    return;
                }

                const options = {
                    html: htmlContent,
                    fileName: fileName,
                    directory: 'Documents',
                };
                const file = await RNHTMLtoPDF.convert(options);
                setFilePath(file.filePath);
            } catch (error) {
                console.log('PDF generation error:', error);
                Alert.alert('Error', 'Failed to generate PDF.');
            }
        };
        generatePdf();
    }, [htmlContent, fileName]);

    const sharePdf = () => {
        if (!filePath) return;
        Share.open({
            title: 'Details',
            url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
        }).catch(err => console.log(err));
    };

    const handleDownload = useCallback(() => {
        if (!filePath) return;
        const { fs } = RNFetchBlob;
        const { dirs } = fs;
        const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const destPath = `${dirToSave}/${fileName}_${timestamp}.pdf`;

        fs.cp(filePath, destPath)
            .then(() => {
                if (Platform.OS === 'android') {
                    RNFetchBlob.android.addCompleteDownload({
                        title: fileName,
                        description: 'PDF file',
                        mime: 'application/pdf',
                        path: destPath,
                        showNotification: true,
                    });
                }
                Alert.alert('Success', 'PDF downloaded successfully.');
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Error', 'Failed to download PDF.');
            });
    }, [filePath, fileName]);

    // Handle Android back button
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const bs = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => bs.remove();
    }, [navigation]);

    return (
        <View style={[Gutters.defBMargin, { backgroundColor: '#EEEEF1', height: '100%', width: '100%' }]}>
            <View style={[Layout.fill, Layout.center]}>
                {filePath ? (
                    <Text style={{ color: Colors.text, fontSize: 16 }}>PDF generated at {filePath}</Text>
                ) : (
                    <Text style={{ color: Colors.text, fontSize: 16 }}>Generating PDF...</Text>
                )}
            </View>

            <View style={[Layout.row, Layout.justifyContentEven, Gutters.tinyMargin]}>
                <TouchableOpacity
                    onPress={sharePdf}
                    style={[Layout.center, Gutters.lmicroPadding, Layout.row, Gutters.microRMargin, Gutters.lmicroBRadius, { flex: 6, backgroundColor: Colors.primary }]}
                >
                    <Ionicons name={'logo-whatsapp'} size={15} color={Colors.white} />
                    <Text style={[Fonts.white, Fonts.tiny, Fonts.center, Gutters.microLMargin, Fonts.fw600]}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleDownload}
                    style={[Layout.center, Layout.row, Gutters.lmicroPadding, Gutters.microLMargin, Gutters.lmicroBRadius, { flex: 6, backgroundColor: Colors.secondary }]}
                >
                    <Ionicons name={'cloud-download'} size={15} color={Colors.white} />
                    <Text style={[Fonts.white, Fonts.tiny, Fonts.center, Fonts.fw600, Gutters.microLMargin]}>Download</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default React.memo(HtmlPdfView);
