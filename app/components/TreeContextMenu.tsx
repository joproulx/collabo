import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface OptionProps {
    name: string;
    onClick: () => void;
}

interface TreeContextMenuProps {
    children: React.ReactNode;
    options: OptionProps[];
}


export function TreeContextMenu({ children, options } : TreeContextMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* <button className="p-2 bg-blue-500 text-white rounded">
          ...
        </button> */}

        {/* <button className="flex justify-center items-center hover:border-slate-300 hover:border-2 active:bg-slate-200 text-slate-400 rounded w-6 h-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out">
          <svg  className="w-4 h-4 p-0.5 fill-slate-600" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.055 32.055" >
            <g>
              <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
                C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
                s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
                c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
            </g>
          </svg>
        </button> */}

        { children }
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="right"  // Position to the right of the button
          align="start" // Align the top of the menu with the button
          className="bg-white shadow-lg rounded-md py-1 w-40"
          style={{ cursor: 'pointer' }} 
        >
            {options.map((option, index) => (
                <DropdownMenu.Item key={index} className="p-2 hover:bg-gray-100 focus:outline-none" onClick={option.onClick}>
                    {option.name}   
                </DropdownMenu.Item>
            ))}

          {/* <DropdownMenu.Item className="p-2 hover:bg-gray-100 focus:outline-none" >
            Option 1
          </DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 hover:bg-gray-100 focus:outline-none ">
            Option 2
          </DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
