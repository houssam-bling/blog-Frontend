import {create} from 'zustand'

export const useStore = create((setState) => ({
    isAddPostModalOpen: false,
    isEditUserModalOpen: false,
    postModalMode: 'add',
    selectedPost: null,
    isLoggedIn: localStorage.getItem('isLogin') === "true",
    openPostModal: () => setState({ isAddPostModalOpen: true }),
    closePostModal: () => setState({ isAddPostModalOpen: false }),
    setIsLoggedIn: (isLoggedIn) => setState({ isLoggedIn }),
    closeEditUserModal: () => setState({ isEditUserModalOpen: false }),
    openEditUserModal: () => setState({ isEditUserModalOpen: true }),
    setPostModalMode: (postModalMode) => setState({ postModalMode }),
    setSelectedPost: (selectedPost) => setState({ selectedPost }),
    clearSelectedPost: () => setState({ selectedPost: null }),

    clearStoredAuth: () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('isLogin')
    }
}))
