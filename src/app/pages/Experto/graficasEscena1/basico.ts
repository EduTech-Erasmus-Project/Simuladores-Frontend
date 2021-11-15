export abstract class BasicChart {
    private options: any;

    /**
     * @param options Custom Highcharts options
     */
    constructor(options: any) {
        this.options = options;
    }

    /**
     * This method add a serie with custom options added to
     * chart options series array.
     * @param serie Serie with custom options added
     */
    addSerieToChart(serie: any): void {
        if (!this.options.series) {
            this.options.series = [];
        }
        this.options.series.push(serie);
    }

    removeSeries(): void {
        this.options.series = [];
    }

    addColor(color: string, clean?: boolean): void {
        if (!this.options.colors || clean) {
            this.options.colors = []
        }
        this.options.colors.push(color);
    }

    getOptions(): any {
        return this.options;
    }
}