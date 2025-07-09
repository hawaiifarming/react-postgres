import { DatabaseService } from './databaseService';
import { getConnection } from '../config/database';
import type { ChartData, Farm, Variety, Product } from '../types';

export class PostgresDataService {
    private db: DatabaseService;

    constructor() {
        const connection = getConnection('postgres_views');
        if (!connection) {
            throw new Error('PostgreSQL connection not found');
        }
        this.db = new DatabaseService(connection);
    }

    async loadAllVariableData() {
        const [
            farmsData,
            varietiesData,
            productsData,
        ] = await Promise.all([
            this.db.query('SELECT "Farm" FROM public.global_farms ORDER BY "Index" ASC'),
            this.db.query('SELECT variety FROM public.global_varieties ORDER BY index ASC'),
            this.db.query(`SELECT "ProductCode" FROM public.product_details WHERE "Grade" = 1 
                AND "ProductCode" <> 'KF' AND "ProductCode" <> 'JF' ORDER BY "Index" ASC`),
        ]);

        return {
            farms: farmsData.map(f => ({ farm: f.Farm })) as Farm[],
            varieties: varietiesData as Variety[],
            products: productsData.map(p => ({ productcode: p.ProductCode })) as Product[],
        };
    }

    async loadAllWeeklyData() {
        const [
            variableData,
            summaryChartData,
            summaryTableDollarData,
            summaryTableCasesData,
            summaryChartPoundsData,
            productChartData,
            productTableDollarData,
            productTableCasesData,
            varietyTablePoundsData,
        ] = await Promise.all([
            this.loadAllVariableData(),
            this.db.query(`SELECT * FROM public.sales_budget_weekly_summary_chart_dollars_cases 
                ORDER BY "ISOYear" Desc, "DataLabel" Desc, "ISOWeek"`),
            this.db.query('SELECT * FROM public.sales_budget_weekly_summary_table_dollars'),
            this.db.query('SELECT * FROM public.sales_budget_weekly_summary_table_cases'),
            this.db.query('SELECT * FROM public.sales_budget_weekly_summary_chart_pounds'),
            this.db.query(`SELECT * FROM public.sales_budget_weekly_product_chart_dollars_cases 
                ORDER BY "ISOYear" Desc, "DataLabel" Desc, "ISOWeek"`),
            this.db.query('SELECT * FROM public.sales_budget_weekly_product_table_dollars'),
            this.db.query('SELECT * FROM public.sales_budget_weekly_product_table_cases'),
            this.db.query('SELECT * FROM public.sales_budget_weekly_variety_table_pounds'),
        ]);

        return {
            ...variableData,
            summaryChartDollarsCases: summaryChartData,
            summaryTableDollar: summaryTableDollarData,
            summaryTableCases: summaryTableCasesData,
            summaryChartPounds: summaryChartPoundsData,
            productChartDollarsCases: productChartData,
            productTableDollar: productTableDollarData,
            productTableCases: productTableCasesData,
            varietyTablePounds: varietyTablePoundsData,
        };
    }

    async loadAllMonthlyData() {
        const [
            variableData,
            summaryChartData,
            summaryTableDollarData,
            summaryTableCasesData,
            summaryChartPoundsData,
            productChartData,
            productTableDollarData,
            productTableCasesData,
            varietyTablePoundsData,
        ] = await Promise.all([
            this.loadAllVariableData(),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_summary_chart_dollars_cases 
                ORDER BY "Year" Desc, "DataLabel" Desc, "Month"`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_summary_table_dollars`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_summary_table_cases`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_summary_chart_pounds 
                ORDER BY "Year" Desc, "DataLabel" Desc, "Month"`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_product_chart_dollars_cases 
                ORDER BY "Year" Desc, "DataLabel" Desc, "Month"`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_product_table_dollars`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_product_table_cases`),
            this.db.query(`SELECT * FROM public.sales_budget_monthly_variety_table_pounds`),
        ]);

        return {
            ...variableData,
            summaryChartDollarsCases: summaryChartData,
            summaryTableDollar: summaryTableDollarData,
            summaryTableCases: summaryTableCasesData,
            summaryChartPounds: summaryChartPoundsData,
            productChartDollarsCases: productChartData,
            productTableDollar: productTableDollarData,
            productTableCases: productTableCasesData,
            varietyTablePounds: varietyTablePoundsData,
        };
    }

    // Generic query method for custom queries on other pages
    async customQuery(sql: string): Promise<ChartData[]> {
        return await this.db.query(sql);
    }
}
