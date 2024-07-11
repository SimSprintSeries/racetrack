//stylowanie Async i Selecta z react-select
export const selectStyles = {
    container: (state: any) => 'w-full p-2',
    control: (state: any) => 'bg-gradient-to-r from-pink-950/15 via-blue-400/5 to-green/10 p-4 ' + `${state.menuIsOpen ? 'rounded-t-lg' : 'rounded-lg' }`,
    dropdownIndicator: (state: any) => `w-12 px-4 flex items-center justify-center ${state.selectProps.menuIsOpen ? 'rotate-180' : ''}`,
    placeholder: () => 'opacity-50',
    menu: (state: any) => 'bg-bg bg-gradient-to-br from-pink-950/15 via-blue-400/5 to-green/10 p-4 rounded-b-lg -translate-y-2 max-w-[22.75rem]',
    option: (state: any) => 'my-4 truncate'
}

