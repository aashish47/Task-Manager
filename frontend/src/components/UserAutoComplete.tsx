import { AutocompleteInputChangeReason, AutocompleteChangeReason, AutocompleteChangeDetails, Autocomplete, Chip, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import useSearchUsersByName from "../hooks/useSearchUsersByName";

export type option = {
    label: string;
    value: string;
};

const UserAutocomplete = ({
    name,
    setName,
    tags,
    setTags,
}: {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const users = useSearchUsersByName(name) ?? [];

    const options: option[] = users.map((user) => ({
        label: user.name,
        value: user.uid,
    }));

    const handleInputChange = (event: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => {
        setName(value);
    };

    const handleTagChange = (
        event: SyntheticEvent<Element, Event>,
        value: (string | option)[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<unknown> | undefined
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
            sx={{ maxWidth: 500, width: "70vw" }}
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
