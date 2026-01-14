import { Component } from '@angular/core';
import { SettingRowComponent, SettingOption } from '../../components/rows/setting-row/setting-row.component';
import { getUnitsSetting, setUnitsSetting } from '../../store/units';
import { UNITS, UnitType } from '../../constants/units';
import { getSaveLocationsSetting, setSaveLocationsSetting } from '../../store/locations';
import { getTimeFormatSetting, setTimeFormatSetting, TimeFormat } from '../../store/time-formats';
import { THEMES, ThemeType } from '../../constants/themes';
import { getThemeSetting, setThemeSetting } from '../../store/theme';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingRowComponent],
  template: `
    <div class="settings-container">
      <div class="settings-section">
        <h2 class="settings-section-title">General</h2>

        <app-setting-row
          label="Theme"
          [options]="themeOptions"
          [selectedValue]="theme"
          (onChange)="handleThemeChange($event)"
        />
      </div>

      <div class="settings-section">
        <h2 class="settings-section-title">Units</h2>

        <app-setting-row
          label="Units"
          [options]="unitsOptions"
          [selectedValue]="units"
          (onChange)="handleUnitsChange($event)"
        />

        <app-setting-row
          label="Time Format"
          [options]="timeOptions"
          [selectedValue]="timeFormat"
          (onChange)="handleTimeFormatChange($event)"
        />
      </div>

      <div class="settings-section">
        <h2 class="settings-section-title">Privacy</h2>

        <app-setting-row
          label="Save Last Locations"
          [options]="locationOptions"
          [selectedValue]="saveLocations ? 'on' : 'off'"
          (onChange)="handleSaveLocationsChange($event)"
        />
      </div>
    </div>
  `,
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  units: UnitType = getUnitsSetting();
  saveLocations = getSaveLocationsSetting();
  timeFormat: TimeFormat = getTimeFormatSetting();
  theme: ThemeType = getThemeSetting();

  unitsOptions: SettingOption[] = [
    { label: 'Metric (°C, km/h, hPa)', value: UNITS.METRIC },
    { label: 'Imperial (°F, mph, inHg)', value: UNITS.IMPERIAL },
  ];

  locationOptions: SettingOption[] = [
    { label: 'On', value: 'on' },
    { label: 'Off', value: 'off' },
  ];

  timeOptions: SettingOption[] = [
    { label: '12-hour', value: '12' },
    { label: '24-hour', value: '24' },
  ];

  themeOptions: SettingOption[] = [
    { label: 'Light', value: THEMES.LIGHT },
    { label: 'Dark', value: THEMES.DARK },
  ];

  handleUnitsChange(value: string): void {
    this.units = value as UnitType;
    setUnitsSetting(value as UnitType);
  }

  handleSaveLocationsChange(value: string): void {
    const boolValue = value === 'on';
    this.saveLocations = boolValue;
    setSaveLocationsSetting(boolValue);
  }

  handleTimeFormatChange(value: string): void {
    this.timeFormat = value as TimeFormat;
    setTimeFormatSetting(value as TimeFormat);
  }

  handleThemeChange(value: string): void {
    this.theme = value as ThemeType;
    setThemeSetting(value as ThemeType);
  }
}
