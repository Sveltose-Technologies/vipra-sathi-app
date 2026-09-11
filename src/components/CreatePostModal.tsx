import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { PostType } from '../types/community';

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string, type: PostType) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ visible, onClose, onSubmit }) => {
  const { colors, isDark } = useTheme();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<PostType>('question');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSubmit(title.trim(), content.trim(), type);
    setTitle('');
    setContent('');
    setType('question');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          style={[styles.modalContainer, { backgroundColor: colors.background }]} 
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
        <View style={[styles.header, { borderBottomColor: colors.border, justifyContent: 'center' }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Create Post</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.label, { color: colors.text }]}>Post Type</Text>
          <View style={styles.segmentedControl}>
            {(['question', 'knowledge', 'suggestion'] as PostType[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.segmentButton,
                  type === t && { backgroundColor: colors.primary },
                  { borderColor: colors.border }
                ]}
                onPress={() => setType(t)}
              >
                <Text style={[
                  styles.segmentText,
                  { color: type === t ? '#FFF' : colors.text }
                ]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: colors.text }]}>Title</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
            placeholder="What is this about?"
            placeholderTextColor={colors.textLight}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, { color: colors.text }]}>Content</Text>
          <TextInput
            style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
            placeholder="Share your thoughts, ask a question, or suggest an idea..."
            placeholderTextColor={colors.textLight}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { borderColor: colors.primary, borderWidth: 1, backgroundColor: 'transparent' }]}
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, { color: colors.primary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: title.trim() && content.trim() ? colors.primary : colors.border }]}
              onPress={handleSubmit}
              disabled={!title.trim() || !content.trim()}
            >
              <Text style={[styles.saveButtonText, { color: title.trim() && content.trim() ? '#FFF' : colors.textLight }]}>Post</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    borderRadius: 20,
    maxHeight: '90%',
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  iconButton: { padding: 4 },
  content: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
  },
  segmentText: { fontSize: 14, fontWeight: '500' },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePostModal;
