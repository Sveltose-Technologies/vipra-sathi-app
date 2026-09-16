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
          style={styles.keyboardView}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>

            {/* Header with accent */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <View style={styles.headerLeft}>
                <View style={[styles.headerIcon, { backgroundColor: colors.primary + '15' }]}>
                  <Icon name="edit-3" size={18} color={colors.primary} />
                </View>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Create Post</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Icon name="x" size={20} color={colors.textLight} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
              <Text style={[styles.label, { color: colors.text }]}>Post Type</Text>
              <View style={[styles.segmentedControl, { borderColor: colors.border }]}>
                {(['question', 'knowledge', 'suggestion'] as PostType[]).map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.segmentButton,
                      type === t && { backgroundColor: colors.primary },
                      { borderColor: colors.border },
                    ]}
                    onPress={() => setType(t)}
                  >
                    <Text style={[
                      styles.segmentText,
                      { color: type === t ? '#FFF' : colors.text },
                    ]}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.label, { color: colors.text }]}>Title</Text>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                placeholder="What is this about?"
                placeholderTextColor={colors.textLight + '80'}
                value={title}
                onChangeText={setTitle}
              />

              <Text style={[styles.label, { color: colors.text }]}>Content</Text>
              <TextInput
                style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                placeholder="Share your thoughts..."
                placeholderTextColor={colors.textLight + '80'}
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
              />

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.cancelBtn, { borderColor: colors.border }]}
                  onPress={onClose}
                >
                  <Text style={[styles.cancelText, { color: colors.textLight }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitBtn, {
                    backgroundColor: title.trim() && content.trim() ? colors.primary : colors.border,
                  }]}
                  onPress={handleSubmit}
                  disabled={!title.trim() || !content.trim()}
                >
                  <Icon name="send" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={[styles.submitText, {
                    color: title.trim() && content.trim() ? '#FFF' : colors.textLight,
                  }]}>Post</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
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
    padding: 20,
  },
  keyboardView: {
    width: '100%',
  },
  modalContainer: {
    borderRadius: 20,
    maxHeight: '90%',
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { padding: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    minHeight: 120,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
  },
  segmentText: { fontSize: 13, fontWeight: '600' },
  actionRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelText: { fontSize: 15, fontWeight: '600' },
  submitBtn: {
    flex: 1.5,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { fontSize: 15, fontWeight: '700' },
});

export default CreatePostModal;
