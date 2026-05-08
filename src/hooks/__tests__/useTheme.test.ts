import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useTheme } from "../useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    vi.restoreAllMocks();
  });

  it("inicia com tema claro quando sem preferência salva e sistema é light", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("inicia com tema escuro quando sistema prefere dark", () => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("restaura tema salvo no localStorage", () => {
    localStorage.setItem("wswork_theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("toggle alterna de light para dark", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggle(); });
    expect(result.current.theme).toBe("dark");
  });

  it("toggle alterna de dark para light", () => {
    localStorage.setItem("wswork_theme", "dark");
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggle(); });
    expect(result.current.theme).toBe("light");
  });

  it("adiciona classe 'dark' no <html> quando tema é dark", () => {
    localStorage.setItem("wswork_theme", "dark");
    renderHook(() => useTheme());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("remove classe 'dark' do <html> quando tema é light", () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("wswork_theme", "light");
    renderHook(() => useTheme());
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persiste o tema no localStorage após toggle", () => {
    const { result } = renderHook(() => useTheme());
    act(() => { result.current.toggle(); });
    expect(localStorage.getItem("wswork_theme")).toBe("dark");
  });
});
