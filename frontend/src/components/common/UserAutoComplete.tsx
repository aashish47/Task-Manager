import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, Chip, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import useSearchUsersByName from "../../hooks/user/useSearchUsersByName";

export type option = {
    label: string;
    value: string;
};

type UserAutoCompleteProps = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    members: string[];
};

const UserAutocomplete: React.FC<UserAutoCompleteProps> = ({ name, setName, setTags, members }) => {
    const users = useSearchUsersByName(name) ?? [];

    const options: option[] = [];

    for (let i = 0; i < users.length; i++) {
        if (!members.includes(users[i].uid)) {
            options.push({
                label: users[i].name,
                value: users[i].uid,
            });
        }
    }

    const handleInputChange = (_event: SyntheticEvent<Element, Event>, value: string, _reason: AutocompleteInputChangeReason) => {
        setName(value);
    };

    const handleTagChange = (
        _event: SyntheticEvent<Element, Event>,
        value: (string | option)[],
        _reason: AutocompleteChangeReason,
        _details?: AutocompleteChangeDetails<unknown> | undefined
    ) => {
        if (value) {
            const tagValues = value.map((user) => (typeof user === "string" ? user : user.value));
            setTags(tagValues);
        } else {
            setTags([]);
        }
    };

    return (
        <Autocomplete
            filterOptions={(x) => x}
            onInputChange={handleInputChange}
            onChange={handleTagChange}
            multiple
            id="tags-filled"
            options={options}
            getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
            freeSolo
            renderTags={(value: readonly option[], getTagProps) =>
                value.map((option: option, index: number) => <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />)
            }
            renderInput={(params) => <TextField {...params} label="Users" placeholder="Enter name" />}
        />
    );
};

export default UserAutocomplete;
