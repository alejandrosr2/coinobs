import { render, screen, fireEvent } from "@testing-library/react"
import PositionCalculator from "@/pages/posCalculator/PositionCalculator"
import { describe, expect, it } from "vitest"

describe("PositionCalculator", () => {
    it("displays inputs and calculates correctly", () => {
        render(<PositionCalculator />)
        // Inputs
        fireEvent.change(screen.getByLabelText("Capital Base"), { target: { value: "2000" } })
        fireEvent.change(screen.getByLabelText("Pérdida máxima asumible %"), { target: { value: "2" } })
        fireEvent.change(screen.getByLabelText("Precio Entrada"), { target: { value: "50" } })
        fireEvent.change(screen.getByLabelText("StopLoss"), { target: { value: "40" } })
        // Resultados esperados
        expect(screen.getByText("40.00 $")).toBeInTheDocument()
        expect(screen.getByText("4")).toBeInTheDocument()
        expect(screen.getByText("200$")).toBeInTheDocument()
    })
})
