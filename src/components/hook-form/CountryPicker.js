import { MenuItem, TextField } from '@mui/material';
import countries from "i18n-iso-countries";
import { useFormContext, Controller } from 'react-hook-form';

const CountryPicker = ({ name, ...other }) => {

    const { control } = useFormContext();

    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: value
        };
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                    select
                >
                    {!!countryArr?.length &&
                        countryArr.map(({ label, value }, index) => (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                </TextField>
            )}
        />
    );
}



export default CountryPicker;